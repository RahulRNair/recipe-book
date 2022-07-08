import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Youtube, HouseDoorFill } from "react-bootstrap-icons";
import { get_receipe_details } from "../../services/recipes";
import Error from "../../Common/error";
import Loading from "../../Common/loading";

function Details() {
    const { category_name, id } = useParams();
    const [records, setrecords] = useState([]);
    const [error, setError] = useState(0);
    useEffect(() => {
        get_receipe_details(id)
            .then((res) => {
                setrecords(res.data.meals);
            })
            .catch((err) => {
                setError(1);
            });
    }, [id]);
    if (records && records.length > 0) {
        return (
            <div className="container mb-5">
                <div className="py-4">
                    <HouseDoorFill size={25} />
                    <Link to={"/"} className="home-link">
                        Home
                    </Link>
                    <span className="link-divider">/</span>
                    <Link
                        to={`/category/${category_name}`}
                        className="category-nav-link">
                        {category_name}
                    </Link>
                </div>
                {records.map((item, index) => {
                    let imageUrl = item?.strMealThumb;

                    let instructionList = item?.strInstructions
                        ? item.strInstructions.split("\n")
                        : "";
                    let tags = item?.strTags ? item.strTags.split(",") : [];
                    var ingredients = [];
                    for (var i = 1; i <= 20; i++) {
                        // eslint-disable-next-line no-eval
                        if (eval("item.strIngredient" + i) !== "") {
                            // eslint-disable-next-line no-eval
                            var measure = eval("item.strMeasure" + i);
                            // eslint-disable-next-line no-eval
                            var ingredient = eval("item.strIngredient" + i);
                            ingredients.push(
                                <li key={"ingredients-" + i}>
                                    <b>{measure}</b> {ingredient}
                                </li>
                            );
                        }
                    }
                    return (
                        <div key={"receipe-details" + index}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="container-image">
                                        <img src={imageUrl} alt=""></img>
                                        {item.strYoutube ? (
                                            <a
                                                className="btn btn-danger watch-btn"
                                                href={item.strYoutube}
                                                target="_blank"
                                                rel="noreferrer">
                                                Watch <Youtube size={20} />
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    {tags.length > 0 ? (
                                        <span>
                                            <b>Tags: </b>
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    {tags.map((tag, index) => {
                                        return (
                                            <span
                                                key={"tag-" + index}
                                                className="badge text-bg-primary tags">
                                                {tag}
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className="col-lg-6">
                                    <div className="">
                                        <h1 className="display-4">
                                            {item.strMeal}
                                        </h1>
                                        {item.strArea !== "" ? (
                                            <p>
                                                Cuisine: <b>{item.strArea}</b>
                                            </p>
                                        ) : (
                                            ""
                                        )}

                                        <div className="ingredients-section p-1">
                                            <h4>Ingredients</h4>

                                            <ul className="ingredients">
                                                {ingredients}
                                            </ul>
                                        </div>
                                        <h4>Cooking Instructions</h4>
                                        <ol>
                                            {instructionList.map(
                                                // eslint-disable-next-line array-callback-return
                                                (
                                                    instruction,
                                                    instructionIndex
                                                ) => {
                                                    if (
                                                        instruction.length > 3
                                                    ) {
                                                        return (
                                                            <li
                                                                key={
                                                                    "instruction-" +
                                                                    instructionIndex
                                                                }>
                                                                {instruction}
                                                            </li>
                                                        );
                                                    } else {
                                                        return "";
                                                    }
                                                }
                                            )}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
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
export default Details;
