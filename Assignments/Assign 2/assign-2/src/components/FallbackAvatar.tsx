import { useState } from "react";
import { Avatar } from "@chakra-ui/react";

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';

export default function FallbackAvatar({film, name, src, size}: any) {

    const [source, setSrc] = useState(src)
    
    return (
        <Avatar 
            name={name} 
            src={source}
            onError={() => setSrc('https://media.licdn.com/dms/image/C4E03AQGXhxqmRqx4FA/profile-displayphoto-shrink_200_200/0/1516486691853?e=1685577600&v=beta&t=oRBwCvaSwu38kBZ3u7QZbcjMTEEnu7Uz6fpwuHU5sn4')}
            size={size}/>
    )
}