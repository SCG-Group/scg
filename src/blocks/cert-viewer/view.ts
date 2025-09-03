import type {
	PDFDocumentProxy,
	PDFPageProxy,
	PDFDocumentLoadingTask,
} from 'pdfjs-dist';
import { getContext, getElement, store } from '@wordpress/interactivity';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { getDocument, GlobalWorkerOptions } from 'pdfjs';
import { MODAL_OPEN, WITH_MOTION_QUERY } from '../../scripts/constants.ts';
import gsap from 'gsap';

interface CertViewer {
	/* PDFJS document object */
	pdf: PDFDocumentProxy;
	/* PDFJS page object */
	page: PDFPageProxy;
	/* Canvas HTML element */
	canvas: HTMLCanvasElement;
	/* Canvas Context */
	canvasContext: CanvasRenderingContext2D;
	/* Certificate url */
	certUrl: string;
}

interface State {
	/* Currently displayed certificate */
	url: string;
	/* Modal visible state */
	isModalOpen: boolean;
	/* Loading state */
	isLoading: boolean;
	/* Document loading state */
	documentLoading: boolean;
	/* Page loading state */
	pageLoading: boolean;
	/* Page rendering state */
	isRendering: boolean;
	/* Currently displayed page */
	currentPage: number;
	/* Total document pages */
	pages: number;
	/* Zoom level [ZOOM_MAX, ZOOM_MIN] */
	zoom: number;
	/* Document initial scale */
	scale?: number;
	/* Error message */
	error?: string;
	/* Active trigger element */
	previousFocus: HTMLElement | null;
	/* Animation object */
	animation: gsap.core.Timeline;
}

const MODAL_MAX_WIDTH = 1280;
const ZOOM_MAX = 3;
const ZOOM_MIN = -3;
const SCALE_FACTOR = 1.25;
const FOCUS = '.wp-block-scg-cert-viewer__canvas';
const BACKDROP = '.wp-block-scg-cert-viewer__backdrop';
const MODAL = '.wp-block-scg-cert-viewer__modal';

GlobalWorkerOptions.workerSrc =
	'https://unpkg.com/pdfjs-dist@5.4.54/legacy/build/pdf.worker.min.mjs';

export const { state, actions, callbacks } = store( 'scg/cert-viewer', {
	state: {
		url: '',
		isModalOpen: false,
		documentLoading: false,
		pageLoading: false,
		isRendering: false,
		get isLoading() {
			return state.documentLoading || state.pageLoading;
		},
		currentPage: 1,
		get hasPrevPage() {
			return state.currentPage > 1;
		},
		get hasNextPage() {
			return state.currentPage < state.pages;
		},
		pages: 0,
		get hasPages() {
			return state.pages > 1;
		},
		zoom: 0,
		get canZoomIn() {
			return state.zoom < ZOOM_MAX;
		},
		get canZoomOut() {
			return state.zoom > ZOOM_MIN;
		},
		previousFocus: null,
		animation: gsap.timeline(),
	} as State,
	actions: {
		onCertClick: () => {
			const { certUrl } = getContext< CertViewer >();

			if ( certUrl !== state.url && ! state.isLoading ) {
				state.url = certUrl;
			} else {
				actions.openModal( false );
			}
		},
		openModal: ( wait: boolean = true ) => {
			if ( wait ) {
				state.animation.tweenTo( 'modal' );
			} else {
				state.animation.play( 0 );
			}
			state.isModalOpen = true;
		},
		closeModal: () => {
			state.animation.reverse();
			state.isModalOpen = false;
		},
		nextPage: () => {
			state.currentPage =
				state.currentPage < state.pages
					? state.currentPage + 1
					: state.pages;

			callbacks.renderPage( state.currentPage );
		},
		prevPage: () => {
			state.currentPage =
				state.currentPage > 1 ? state.currentPage - 1 : 1;

			callbacks.renderPage( state.currentPage );
		},
		zoomIn: () => {
			state.zoom = Math.min( state.zoom + 1, ZOOM_MAX );

			if ( state.scale ) {
				state.scale = state.scale * SCALE_FACTOR;
			}

			callbacks.zoom();
		},
		zoomOut: () => {
			state.zoom = Math.max( state.zoom - 1, ZOOM_MIN );

			if ( state.scale ) {
				state.scale = state.scale / SCALE_FACTOR;
			}

			callbacks.zoom();
		},
		resetState: () => {
			state.pages = 0;
			state.currentPage = 1;
			state.zoom = 0;
			state.scale = undefined;
			state.error = undefined;
		},
	},
	callbacks: {
		*display() {
			if ( state.isRendering ) {
				return;
			}

			state.isRendering = true;

			const ctx = getContext< CertViewer >();
			const { page, canvas, canvasContext } = ctx;
			const viewport = callbacks.getViewport( page );
			const { width, height } = viewport;

			canvas.height = height;
			canvas.width = width;

			yield page.render( {
				canvas,
				canvasContext,
				viewport,
			} ).promise;

			state.isRendering = false;
		},
		*loadDocument( url: string ) {
			const ctx = getContext< CertViewer >();
			const ref = getElement().ref as HTMLElement;
			const loadingTask: PDFDocumentLoadingTask =
				yield getDocument( url );

			ctx.pdf = yield loadingTask.promise;
			state.pages = ctx.pdf.numPages;
			ctx.canvas = ref.querySelector( 'canvas' ) as HTMLCanvasElement;
			ctx.canvasContext = ctx.canvas.getContext(
				'2d'
			) as CanvasRenderingContext2D;
		},
		*loadPage( pageNumber = 1 ) {
			const ctx = getContext< CertViewer >();
			ctx.page = yield ctx.pdf.getPage( pageNumber );
		},
		*renderPage( page?: number ) {
			try {
				state.pageLoading = true;
				yield callbacks.loadPage( page );
				yield callbacks.display();
			} catch ( e ) {
				if ( e instanceof Error ) {
					state.error = e.message;
				}
			} finally {
				state.pageLoading = false;
			}
		},
		*zoom() {
			state.pageLoading = true;
			yield callbacks.display();
			state.pageLoading = false;
		},
		*handleUrlChange() {
			if ( ! state.url.length ) {
				actions.closeModal();
				return;
			}

			actions.resetState();
			actions.openModal();

			try {
				state.documentLoading = true;
				yield callbacks.loadDocument( state.url );
				yield callbacks.renderPage();
			} catch ( e ) {
				if ( e instanceof Error ) {
					state.error = e.message;
				}
			} finally {
				const el = getElement().ref as HTMLElement;

				state.documentLoading = false;
				state.animation.play( 'modal' );
				window.requestAnimationFrame( () => {
					( el.querySelector( FOCUS ) as HTMLElement )?.focus();
				} );
			}
		},
		handleModalOpen: () => {
			if ( state.isModalOpen ) {
				const el = getElement().ref as HTMLElement;

				state.previousFocus = el.ownerDocument
					.activeElement as HTMLElement;

				document.documentElement.classList.add( MODAL_OPEN );
			} else {
				document.documentElement.classList.remove( MODAL_OPEN );

				if ( state.previousFocus ) {
					state.previousFocus.focus();
				}
			}
		},
		getViewport: ( page: PDFPageProxy ) => {
			const { width } = page.getViewport( { scale: 1 } );
			state.scale = state.scale || MODAL_MAX_WIDTH / width;

			return page.getViewport( { scale: state.scale } );
		},
		escClose: ( event: KeyboardEvent ) => {
			if ( ! state.isModalOpen ) {
				return;
			}

			if ( 'Escape' === event.code ) {
				event.preventDefault();
				actions.closeModal();
			}
		},
		setupAnimation: () => {
			const element = getElement().ref as HTMLElement;

			gsap.matchMedia().add(
				WITH_MOTION_QUERY,
				() => {
					state.animation.pause();
					state.animation
						.set( BACKDROP, {
							autoAlpha: 0,
							display: 'none',
						} )
						.set( element, {
							display: 'flex',
						} )
						.set( MODAL, {
							visibility: 'hidden',
							y: '-100vh',
						} )
						.to( BACKDROP, {
							autoAlpha: 1,
							display: 'block',
							duration: 0.35,
							ease: 'back.out',
						} )
						.add( 'modal' )
						.to(
							MODAL,
							{
								visibility: 'visible',
								y: 0,
								duration: 0.5,
								ease: 'power3.inOut',
							},
							'-=0.2'
						)
						.eventCallback( 'onReverseComplete', () => {
							state.animation.revert();
							state.animation.invalidate();
						} );

					return () => {
						state.animation.clear();
					};
				},
				element
			);
		},
	},
} );
