import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex-1 justify-center flex flex-col">
                <h2 className="text-2xl">
                    Want to play chess with Frank on chess.com?
                </h2>
                <p className="text-gray-500 my-2">
                    click here for a match. 
                </p>

                <Button className="rounded-tl-xl rounded-bl-none" gradientDuoTone="purpleToPink"> 
                    <a href="https://www.chess.com/member/nzemia" target="_blank" rel="noopener noreferrer">Play</a>
                </Button>

            </div>

            <div className="p-7 flex-1">
                <img src="https://play-lh.googleusercontent.com/a7R5nyeaX8lIEWdBOxjlvbyq9LcFwh3XMvNtBPEKR3LPGgdvgGrec4sJwn8tUaaSkw" 
                    alt="" 
            />
                
            </div>
        </div>
    )
}
