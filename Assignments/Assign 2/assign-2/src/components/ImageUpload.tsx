import { Image } from "@chakra-ui/react";

export default function ImageUpload({setImageFile, imageUrl, setImageUrl}: any) {

    const handleFileChange = (event: any) => {
        const image = event.target.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onload = () =>{
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(image);
            setImageFile(image);
        }
      };
    
      return (
        <label htmlFor="fileInput">
          <Image bg='teal' 
                 objectFit='cover'
                 maxW={{ base: '100%', sm: '700px' }}
                 h='700px' 
                 cursor='pointer' 
                 src={imageUrl} 
                 fallbackSrc='https://i.imgflip.com/7my1ae.jpg'
                 _hover={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                                                            filter: 'brightness(70%)',
                                                                            transition: 'filter 0.3s ease' }}/>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>
      );
}