import { Avatar } from "@chakra-ui/react";

export default function AvatarUpload({setImageFile, imageUrl, setImageUrl}: any) {

    const handleFileChange = (event: any) => {
        const image = event.target.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onload = () =>{
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(image);
            setImageFile(image)
        }
      };
    
      return (
        <label htmlFor="fileInput">
          <Avatar bg='teal' size='xl' cursor='pointer' src={imageUrl} _hover={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
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