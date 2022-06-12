import { ImageProps } from "../models/ProfileProps";

export function ProfileImage({src}: ImageProps){
    const defaultImageUrl = "../../../public/defaultImage.png"
    return (
        <img 
            src={src || defaultImageUrl}
            style={{
                width: "90px",
                height: "60px",
            }}
        />
    )
}
