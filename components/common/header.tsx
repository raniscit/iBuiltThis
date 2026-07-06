"use client"

import { Building2Icon, BuildingIcon, CompassIcon, HomeIcon, LoaderIcon, SparkleIcon, SparklesIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { OrganizationSwitcher, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { Suspense } from "react"

const Logo = () => {
    return <Link href="/" className="flex items-center gap-2 group">
        <div className="size-8 rounded-lg bg-primary flex  items-center justify-center"><SparkleIcon className="size-4 text-primary-foreground" /></div>
        <span className="text-xl font-bold">i <span className="text-primary">Built</span>This</span>
    </Link>
}

const Header = () => {
    const { isSignedIn } = useUser()
    return (
        <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/62">
            <div className="wrapper px-12">
                <div className="flex h-16 items-center justify-between">
                    <Logo />

                    <nav className="flex items-center gap-1">
                        <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50">
                            <HomeIcon className="size-4" />
                            <span>Home</span>
                        </Link>
                        <Link href="/explore" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50">
                            <CompassIcon className="size-4" />
                            <span>Explore</span>
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Suspense fallback={<div><LoaderIcon className="size-4 animate-spin" /></div>}>
                            {!isSignedIn && (
                                <>
                                    <SignInButton>
                                        <button>
                                            Sign In
                                        </button>
                                    </SignInButton>
                                    <SignUpButton>
                                        <Button >
                                            Sign Up
                                        </Button>
                                    </SignUpButton>
                                </>
                            )}

                            {isSignedIn && (
                                <>
                                    <Button>
                                        <Link href="/submit" className="flex items-center gap-1">
                                            <SparklesIcon className="size-4" />
                                            Submit project
                                        </Link>
                                    </Button>

                                    <UserButton >
                                        <UserButton.UserProfilePage label="Organization"
                                            labelIcon={<BuildingIcon className="size-4" />}
                                            url="/organizations">
                                            <div className="p-4">
                                                <h2>Manage Organization</h2>
                                                <OrganizationSwitcher
                                                    hidePersonal={true}
                                                    afterCreateOrganizationUrl={"/submit"}
                                                    afterSelectOrganizationUrl={"/submit"}
                                                    appearance={{
                                                        elements: {
                                                            rootBox: "w-full",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </UserButton.UserProfilePage>

                                        <UserButton.UserProfilePage label="Admin"
                                            labelIcon={<Building2Icon className="size-4" />}
                                            url="/admin">

                                            <div className="p-4">
                                                <h2>Admin Panel</h2>
                                                <Link href={"/admin"} className="w-full justify-start">
                                                    <Button size={"default"} className="w-full justify-start">Go to Admin Panel</Button>
                                                </Link>
                                                
                                            </div>
                                        </UserButton.UserProfilePage>
                                    </UserButton>
                                </>
                            )}
                        </Suspense>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Header