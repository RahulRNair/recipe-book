import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { get_receipe_by_category } from "../../services/recipes";
import Error from "../../Common/error";
import Loading from "../../Common/loading";

import { HouseDoorFill } from "react-bootstrap-icons";
function Listing() {
    const { category_name } = useParams();
    const [records, setrecords] = useState([]);
    const [error, setError] = useState(0);
    useEffect(() => {
        get_receipe_by_category(category_name)
            .then((res) => {
                console.log(res);
                setrecords(res.data.meals);
            })
            .catch((err) => {
                setError(1);
            });
    }, [category_name]);

    if (records.length > 0) {
        return (
            <div className="container mb-5">
                <div className="py-4">
                    <HouseDoorFill size={25} />
                    <a href="/" className="home-link">
                        Home
                    </a>
                </div>
                <div>
                    <b>Category: </b>
                    {category_name}
                </div>
                <div className="row no-gutter p-2">
                    {records.map((item, index) => {
                        let imageUrl = item?.strMealThumb;
                        let url =
                            "/category/" + category_name + "/" + item.idMeal;
                        return (
                            <div className="col-sm-6 col-md-4 p-1" key={index}>
                                <Link to={url} className="category-link">
                                    <img src={imageUrl} alt="" />
                                    <figcaption>
                                        <h3>{item.strMeal}</h3>

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
export default Listing;
