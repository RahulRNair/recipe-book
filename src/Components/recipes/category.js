import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get_categories } from "../../services/recipes";
import Error from "../../Common/error";
import Loading from "../../Common/loading";
function Category() {
    const [records, setrecords] = useState([]);
    const [error, setError] = useState(0);
    useEffect(() => {
        get_categories()
            .then((res) => {
                setrecords(res.data.categories);
            })
            .catch((err) => {
                setError(1);
            });
    }, []);

    if (records.length > 0) {
        return (
            <div className="container mb-5">
                <div className="row no-gutter m-4 p-4">
                    <h2>Select any of the category for your tasty recipes</h2>

                    {records.map((item, index) => {
                        let imageUrl = item?.strCategoryThumb;
                        let url = "/category/" + item.strCategory;
                        return (
                            <div
                                className="col-sm-6 col-md-4  category-section"
                                key={index}>
                                <Link to={url}>
                                    <img src={imageUrl} alt="" />
                                    <figcaption>
                                        <h3>{item.strCategory}</h3>
                                        <hr />
                                    </figcaption>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else if (error) {
        // Error Content for listing page if there is any error
        return <Error />;
    } else if (!records) {
        return (
            <div className="alert alert-warning m-5" role="alert">
                Receipe you are looking for is not found!
            </div>
        );
    } else {
        return <Loading />;
    }
}
export default Category;
