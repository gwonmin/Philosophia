import { ImageProps } from "../models/ProfileProps";

export function ProfileImage({src, width, height}: ImageProps){
    return (
        <img 
            src={src}
            style={{
                width: "90px",
                height: "60px",
            }}
        />
    )
}
