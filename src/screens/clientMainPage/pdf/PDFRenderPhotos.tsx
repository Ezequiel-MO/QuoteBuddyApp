import { View, Image, StyleSheet } from '@react-pdf/renderer'

// Define styles for the PDFRenderPhotos component
const styles = StyleSheet.create({
	imageGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	imageContainer: {
		width: '25%', // Adjust the size of the thumbnails
		margin: '1%', // Adjust spacing between images
		alignItems: 'center'
	},
	image: {
		width: 80, // Adjust thumbnail image size
		height: 80 // Adjust thumbnail image size
	}
})

interface Props {
	images: string[]
}

const PDFRenderPhotos = ({ images }: Props) => {
	return (
		<Image
			src="https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1663746175643.png"
			style={styles.image}
		/>
		/* <View style={styles.imageGrid}>
			{images.map((imageSrc, index) => (
				<View key={`${imageSrc}-${index}`} style={styles.imageContainer}>
					<Image src="https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1663746175643.png style={styles.image}" />
				</View>
			))}
		</View> */
	)
}

export default PDFRenderPhotos
