import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';

const TEMPLATE = [
	[
		'scg/logo',
		{
			className: 'scg-site-header__logo',
			templateLock: 'contentOnly',
		},
	],
	[
		'core/group',
		{
			metadata: { name: __( 'Menu', 'scg' ) },
			className: 'wp-block-scg-header__menu',
		},
		[
			[
				'core/navigation',
				{
					templateLock: false,
					className: 'is-style-main',
					overlayMenu: 'never',
				},
			],
			[
				'core/group',
				{
					metadata: { name: __( 'Mobile Menu', 'scg' ) },
					templateLock: false,
					className: 'wp-block-scg-header__mobile-menu',
				},
				[
					[
						'core/navigation',
						{
							overlayMenu: 'never',
						},
					],
					[
						'core/template-part',
						{
							slug: 'social-media-links',
							theme: 'scg',
						},
					],
				],
			],
		],
	],
];

export default () => {
	const [ isScrolled, setIsScrolled ] = useState( false );
	const [ isOpen, setIsOpen ] = useState( false );
	const ref = useRef();
	const blockProps = useBlockProps( { ref } );
	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		templateLock: 'all',
	} );

	const handleClick = () => {
		setIsOpen( ! isOpen );
	};

	useEffect( () => {
		const { ownerDocument } = ref.current;
		const handleScroll = () => {
			setIsScrolled( ownerDocument.documentElement.scrollTop > 0 );
		};

		handleScroll();

		ownerDocument.addEventListener( 'scroll', handleScroll, true );

		return () =>
			ownerDocument.removeEventListener( 'scroll', handleScroll );
	}, [] );

	return (
		<>
			<div
				{ ...innerBlocksProps }
				data-is-open={ isOpen }
				data-is-scrolled={ isScrolled }
			>
				<div className="wp-block-scg-header__bg" />
				{ children }
				<button
					className="wp-block-scg-header__toggle"
					aria-label={ __( 'Toggle menu', 'scg' ) }
					onClick={ handleClick }
				/>
			</div>
		</>
	);
};
