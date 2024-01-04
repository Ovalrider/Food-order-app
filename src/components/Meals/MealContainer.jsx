import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../../hooks/useHttp.js";

const requestConfig = { method: "GET" };

export default function MealContainer() {
  const { data : meals, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );
  if (isLoading) {
    return <p className="center">Loading data.</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <ul id="meals">
        {meals.map((item) => {
          return <MealItem key={item.id} meal={item} />;
        })}
      </ul>
    );
  }
}
