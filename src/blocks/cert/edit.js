import { useBlockProps } from '@wordpress/block-editor';
import Marker from './marker';
import Controls from './controls';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'is-layout-grid',
	} );
	const { name, category, img, imgId, certId, certFilename } = attributes;

	return (
		<>
			<Controls
				setAttributes={ setAttributes }
				category={ category }
				img={ img }
				imgId={ imgId }
				certId={ certId }
				docName={ certFilename }
				name={ name }
			/>
			<div { ...blockProps }>
				{ category && (
					<div className="wp-block-scg-cert__category">
						{ category }
					</div>
				) }
				<div className="wp-block-scg-cert__details is-layout-flex ">
					{ img && (
						<img
							src={ img }
							alt={ name }
							className="wp-block-scg-cert__badge"
							loading="lazy"
						/>
					) }
					<p className="wp-block-scg-cert__name">{ name }</p>
					{ certId && <Marker /> }
				</div>
			</div>
		</>
	);
}
