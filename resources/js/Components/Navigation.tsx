// resources/js/Components/Navigation.tsx
import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Navigation() {
    const { auth, url } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle search – redirect to yearbook with query param
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.visit(route('yearbook', { search: searchQuery.trim() }));
            setSearchQuery('');
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/70 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left section: Logo + links */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-indigo-600" />
                            <span className="ml-2 text-xl font-bold text-gray-800 hidden sm:block">EIM</span>
                        </Link>

                        <div className="hidden md:ml-6 md:flex md:space-x-6">
                            <NavLink href={route('yearbook')} active={route().current('yearbook')}>
                                📚 Yearbook
                            </NavLink>
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                            {user?.is_admin && (
                                <NavLink
                                    href={route('admin.profiles.index')}
                                    active={route().current('admin.profiles.*')}
                                >
                                    ⚙️ Admin
                                </NavLink>
                            )}
                        </div>
                    </div>

                    {/* Center: Search (desktop) */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search alumni..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-100/80 border-0 rounded-full px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                                />
                                <svg
                                    className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </form>
                    </div>

                    {/* Right section: Notifications + User dropdown */}
                    <div className="flex items-center space-x-3">
                        {/* Notification bell (placeholder) */}
                        <button className="hidden sm:inline-flex p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 transition">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* User dropdown */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center text-sm focus:outline-none">
                                        <img
                                            src={user?.profile?.avatar ? `/storage/${user.profile.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=6366f1&color=fff&size=32`}
                                            alt={user?.name}
                                            className="h-8 w-8 rounded-full object-cover border-2 border-indigo-200"
                                        />
                                        <span className="ml-2 hidden sm:block text-gray-700 font-medium">{user?.name}</span>
                                        <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>👤 Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">🚪 Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile hamburger */}
                        <div className="-me-2 flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {showingNavigationDropdown ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} md:hidden border-t border-gray-200/70 bg-white/95 backdrop-blur-sm`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href={route('yearbook')} active={route().current('yearbook')}>
                        📚 Yearbook
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                    {user?.is_admin && (
                        <ResponsiveNavLink href={route('admin.profiles.index')} active={route().current('admin.profiles.*')}>
                            ⚙️ Admin
                        </ResponsiveNavLink>
                    )}
                </div>
                {/* Mobile search */}
                <div className="px-4 py-2 border-t border-gray-200/70">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search alumni..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-100/80 border-0 rounded-full px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-indigo-400"
                        />
                        <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </form>
                </div>
                <div className="px-4 py-2 border-t border-gray-200/70">
                    <div className="flex items-center space-x-3">
                        <img
                            src={user?.profile?.avatar ? `/storage/${user.profile.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=6366f1&color=fff&size=32`}
                            alt={user?.name}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="text-gray-700 font-medium">{user?.name}</span>
                    </div>
                    <div className="mt-2 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>👤 Profile</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('logout')} method="post" as="button">🚪 Log Out</ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}