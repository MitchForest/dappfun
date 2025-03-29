import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Home
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 mx-1" />
            {item.current ? (
              <span 
                className="text-gray-900 font-medium text-sm" 
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 