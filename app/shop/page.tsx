'use client';
import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, List, X, Search, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES, SIZES, COLORS, SORT_OPTIONS } from '@/constants';
import ProductCard from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Animations';
import { formatPrice } from '@/utils';

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-[88px] min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" /></div>}>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('Featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Sync URL search param ?q= into the search box
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) { setSearchQuery(q); setPage(1); }
  }, [searchParams]);

  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleColor = (c: string) => setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    if (selectedSizes.length) result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
    if (selectedColors.length) result = result.filter(p => p.colors?.some(c => selectedColors.includes(c)));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    switch (sortBy) {
      case 'Price: Low to High': result.sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': result.sort((a, b) => b.price - a.price); break;
      case 'Best Rated': result.sort((a, b) => b.rating - a.rating); break;
      case 'Newest': result = result.filter(p => p.badge === 'new').concat(result.filter(p => p.badge !== 'new')); break;
    }
    return result;
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, searchQuery]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 1000]);
    setSearchQuery('');
    setPage(1);
  };

  const hasFilters = selectedCategory !== 'All' || selectedSizes.length > 0 || selectedColors.length > 0 || searchQuery;

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-4">Search</h3>
        <div className="flex items-center gap-2 border border-[#E5E5E5] px-3 py-2">
          <Search size={14} className="text-[#6B6B6B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search products..."
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-4">Category</h3>
        <ul className="space-y-2">
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button
                onClick={() => { setSelectedCategory(cat); setPage(1); }}
                className={`text-sm w-full text-left py-1 transition-colors ${selectedCategory === cat ? 'text-[#D4AF37] font-medium' : 'text-[#6B6B6B] hover:text-[#111111]'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-10 h-10 text-xs font-medium border transition-all ${selectedSizes.includes(size) ? 'bg-[#111111] text-white border-[#111111]' : 'border-[#E5E5E5] text-[#111111] hover:border-[#111111]'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-4">Color</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(color) ? 'border-[#D4AF37] scale-110' : 'border-transparent hover:border-[#E5E5E5]'}`}
              style={{ backgroundColor: color, boxShadow: color === '#FFFFFF' ? 'inset 0 0 0 1px #E5E5E5' : undefined }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-4">
          Price: {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
        </h3>
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[1]}
          onChange={e => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-[#D4AF37]"
        />
      </div>

      {hasFilters && (
        <button onClick={clearFilters} className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 transition-colors">
          <X size={12} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="pt-[88px]">
      {/* Header */}
      <div className="bg-[#111111] text-white py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Discover</p>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold">Shop All</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="lg:hidden flex items-center gap-2 text-[11px] tracking-widest uppercase font-medium border border-[#E5E5E5] px-4 py-2 hover:border-[#111111] transition-colors"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <p className="text-sm text-[#6B6B6B]">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none text-[11px] tracking-widest uppercase border border-[#E5E5E5] px-4 py-2 pr-8 bg-white outline-none cursor-pointer hover:border-[#111111] transition-colors"
              >
                {SORT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B6B6B]" />
            </div>
            {/* View toggle */}
            <div className="hidden sm:flex border border-[#E5E5E5]">
              <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-[#111111]'}`}>
                <Grid3X3 size={16} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-[#111111]'}`}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterPanel />
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {filterOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFilterOpen(false)} className="fixed inset-0 z-50 bg-black/50 lg:hidden" />
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed top-0 left-0 bottom-0 z-[51] w-[300px] bg-white p-6 overflow-y-auto lg:hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg font-semibold">Filters</h2>
                    <button onClick={() => setFilterOpen(false)}><X size={20} /></button>
                  </div>
                  <FilterPanel />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-2xl text-[#6B6B6B] mb-4">No products found</p>
                <button onClick={clearFilters} className="text-[11px] tracking-widest uppercase text-[#D4AF37] border-b border-[#D4AF37] pb-0.5">
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={viewMode === 'grid'
                  ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6'
                  : 'space-y-4'
                }
              >
                <AnimatePresence>
                  {paginated.map(product => (
                    <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 text-sm font-medium transition-all ${page === i + 1 ? 'bg-[#111111] text-white' : 'border border-[#E5E5E5] text-[#111111] hover:border-[#111111]'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
