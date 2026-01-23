import React, { useEffect, useState } from 'react';
import CategoryItem from '../pages/category/CategoryItem';
import { getAllCategories } from '../services/apiService';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories({ pageSize: 50 }); // Fetch more categories
                let categoryList = [];
                if (Array.isArray(data)) {
                    categoryList = data;
                } else if (data && Array.isArray(data.content)) {
                    categoryList = data.content;
                }
                setCategories(categoryList);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="section-content padding-y">
            <div className="container">
                <nav className="row">
                    {loading ? (
                        <div className="col-12 text-center pb-5 pt-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p className="mt-2 text-muted">Đang tải danh mục...</p>
                        </div>
                    ) : categories.length > 0 ? (
                        categories.map((category, index) => (
                            <CategoryItem category={category} key={category.categoryId || index} />
                        ))
                    ) : (
                        <div className="col-12 text-center">Không có danh mục nào.</div>
                    )}
                </nav>
            </div>
        </section>
    );
};

export default Category;
