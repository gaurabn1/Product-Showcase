import { useProducts } from "../hooks/fetch-products";
import { useCategoryStore } from "../store/useCategoryStore";
import { useEffect, useState } from "react";
import { SkeletonCard } from "../products/skeleton";
import { Product } from "../products/types/product";
import Pagination from "../products/components/pagination";
import { CategoryDropdown } from "../products/components/category-drop-down";
import { ProductCardComponent } from "../products/components/product-component.card";
import { LoadingAnimation } from "@/components/ui/loading-animation";

export const ProductCard = () => {
  const { data: products, isLoading, isError } = useProducts();
  const selectedCategory = useCategoryStore(state => state.selectedCategory)
  const isCategoryLoading = useCategoryStore(state => state.isLoading)
  const setSelectedCategory = useCategoryStore(state => state.setSelectedCategory)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const firstProduct = products?.[0]
    console.log(firstProduct?.category)
    setSelectedCategory(firstProduct?.category || '')
  }, [products])

  if (isLoading || !selectedCategory) {
    return (
      <div className="grid sm:grid-cols-1 sm:px-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  if (isCategoryLoading) {
    return (
      <LoadingAnimation />
    )
  }

  if (isError) {
    return <div>Error loading products..</div>;
  }

  if (!products || products.length === 0) return <p>No products available</p>;

  const categories: string[] = [...new Set(products.map((product: Product) => product.category))]

  const groupedProducts: Record<string, Product[]> = products.reduce((acc: Record<string, Product[]>, product: Product) => {
    if (product.category) {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
    }
    return acc
  }, {})

  const currentProducts = groupedProducts[selectedCategory]?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil((groupedProducts[selectedCategory]?.length || 0) / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="mb-4 ">
      {
        <div>
          <div className="flex justify-between">
            <h2 className="md:text-2xl font-bold m-4 capitalize">{selectedCategory}</h2>
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-4 gap-6">
            {currentProducts.map((product: Product) => (
              <ProductCardComponent key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      }
    </div>
  );
};
