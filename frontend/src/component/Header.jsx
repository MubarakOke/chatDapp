import { Flex } from "@radix-ui/themes";
import Icon from "../assets/Icon.png";
import "./Header.css"

export default function Header() {
    return (
        <div className="header flex justify-between items-center">
            <div className="imageIcon"><img src={Icon}/></div>
            <Flex gap={"4"} align={"center"}>
                <w3m-button />
            </Flex>
        </div>
    );
}
