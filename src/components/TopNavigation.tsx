import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Utility function to convert file name to a more readable format
const formatPageName = (fileName: string): string => {
    return fileName
        .replace(/\.(tsx|jsx)$/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const TopNavigation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [artifactPages, setArtifactPages] = useState<string[]>([]);

    useEffect(() => {
        // Dynamically import all .tsx files from the artifacts directory
        const modules = import.meta.glob('/src/artifacts/*.tsx');

        // Extract page names from the file paths
        const pageNames = Object.keys(modules)
            .map(path => {
                const match = path.match(/\/([^/]+)\.tsx$/);
                return match ? match[1] : null;
            })
            .filter(Boolean)
            .filter(name => name !== 'index') as string[]; // Filter out the index page

        // Sort alphabetically for consistent navigation
        setArtifactPages(pageNames.sort());
    }, []);

    // Find current page index and determine prev/next pages
    const currentPath = location.pathname.substring(1); // Remove leading slash
    const currentIndex = artifactPages.indexOf(currentPath);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            navigate(`/${artifactPages[currentIndex - 1]}`);
        } else {
            // Navigate to the last page if at the beginning
            navigate(`/${artifactPages[artifactPages.length - 1]}`);
        }
    };

    const handleNext = () => {
        if (currentIndex < artifactPages.length - 1 && currentIndex !== -1) {
            navigate(`/${artifactPages[currentIndex + 1]}`);
        } else {
            // Navigate to the first page if at the end or not found
            navigate(`/${artifactPages[0]}`);
        }
    };

    return (
        <nav className="bg-gray-900 text-white p-2">
            <div className="container mx-auto flex justify-between items-center">
                {/* Previous button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                    disabled={artifactPages.length <= 1}
                >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Previous
                </Button>

                {/* Center section with title and dropdown */}
                <div className="flex flex-col items-center">


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="text-gray-300 hover:text-white hover:bg-gray-700"
                            >
                                Pages <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="center"
                            className="w-56 bg-gray-800 border-gray-700 text-gray-300"
                        >
                            {artifactPages.map((page) => {
                                const path = `/${page}`;
                                const isActive = location.pathname === path;

                                return (
                                    <DropdownMenuItem
                                        key={page}
                                        asChild
                                        className={`hover:bg-gray-700 focus:bg-gray-700 hover:text-white focus:text-white ${isActive ? 'bg-gray-900 text-white' : ''
                                            }`}
                                    >
                                        <Link to={path} className="w-full px-2 py-1">
                                            {formatPageName(page)}
                                        </Link>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Next button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                    disabled={artifactPages.length <= 1}
                >
                    Next
                    <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
            </div>
        </nav>
    );
};

export default TopNavigation;