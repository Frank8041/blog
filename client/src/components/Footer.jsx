import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";


export default function FooterComponent() {
    return (
        <Footer
            container
            className="border border-t-8 border-teal-800"       
        
        >
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link to="/" className="self-center whitespace-nowrap 
                            text-lg sm:text-xl font-semibold dark:text-white">
                                <span className="px-2 py-1 bg-gradient-to-r 
                                from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                                    Lingua</span>
                                Blog
                            </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div className="">
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link>
                                    sample link
                                </Footer.Link>
                                <Footer.Link
                                href="/about"
                                target="_blank"
                                rel="noopener noreferrer">
                                    About
                                </Footer.Link>
                                <Footer.Link>
                                    sample links
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>  

                        <div className="">
                            <Footer.Title title="Follow us" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                href="https://www.github.com/frank8041"
                                target="_blank"
                                rel="nooopener noreferrer">
                                    Github
                                </Footer.Link>
                                
                            </Footer.LinkGroup>
                        </div>
                        
                        <div className="">
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                href="#"
                                >
                                    Terms &amp; Conditions
                                </Footer.Link>                                
                            </Footer.LinkGroup>
                        </div>                      
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Frank blog" year={new Date().getFullYear()}/> 

                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" target="_blank" icon={BsFacebook}/>
                        <Footer.Icon href="#" target="_blank" icon={BsInstagram}/>
                        <Footer.Icon href="#" target="_blank" icon={BsTwitter}/>
                        <Footer.Icon href="https://www.github.com/frank8041" target="_blank" icon={BsGithub}/>                        
                    </div>
                </div>
            </div>
        </Footer>
    )
}
