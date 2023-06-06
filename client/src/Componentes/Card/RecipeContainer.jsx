import React, { useEffect, useState } from "react";

import * as actions from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";

import Card from "./Card";

export default function RecipesContainer() {
	const dispatch = useDispatch();

	const activeName = useSelector((state) => state.dogs.activeName);

	const currentFilter = useSelector((state) => state.dogs.activeFilter);

	const stateSort = useSelector((state) => state.dogs.activeSort);

	const temperaments = useSelector((state) => state.temperamentsTypes.data);

	const pagination = useSelector((state) => state.recipes.pagination);

	const [pageView, setPageView] = useState([]);

	const [nameSearch, setNameSearch] = useState("");

	const dogsApi = useSelector((state) => state.dogs.filterData);

	useEffect(() => {
		dispatch(actions.getDogs());
		dispatch(actions.getTemperament());
	}, [dispatch]);

	useEffect(() => {
		let min;
		let max;

		if (pagination.max.length === 1) {
			setPageView(dogsApi);
		} else {
			max = pagination.currentPage * pagination.pageLength;
			min = max - pagination.pageLength;
			setPageView(dogsApi.slice(min, max));
		}
	}, [dogsApi]);

	useEffect(() => {
		let min;
		let max;

		if (pagination.max.length === 1) {
			setPageView(dogsApi);
		} else {
			max = pagination.currentPage * pagination.pageLength;
			min = max - pagination.pageLength;
			setPageView(dogsApi.slice(min, max));
		}
	}, [pagination.currentPage]);

	useEffect(() => {
		setNameSearch(activeName);
	}, [activeName]);

	function handlerFilter(temperaments) {
		dispatch(actions.filterTemperament(temperaments));
	}

	function handlerOrden(orden) {
		dispatch(actions.orderByName(orden));
	}

	/*function changeHandlerPage(page) {
		dispatch(actions.getPage(page));
	}//

	function changeHandlerName(e) {
		setNameSearch(e.target.value);
	}

	function getDogsName(name) {
		console.log(name);
		dispatch(actions.searchName(name));
	}*/

	return (
		<div >
			<div ></div>
			<div >
				<div >
					<div>
						<p>Ordenar por:</p>
						<div >
							<select
								name=""
								id=""
								onChange={(e) => {
									handlerOrden(e.target.value);
								}}
							>
								<option value="default" selected={stateSort === "default"}>
									Inicio
								</option>
								<option value="a-z" selected={stateSort === "a-z"}>
									A-z
								</option>
								<option value="z-a" selected={stateSort === "z-a"}>
									Z-a
								</option>
								<option
									value="menor-mayor"
									selected={stateSort === "menor-mayor"}
								>
									de Menor a Mayor
								</option>
								<option
									value="mayor-menor"
									selected={stateSort === "mayor-menor"}
								>
									de Mayor a Menor
								</option>
							</select>
						</div>
					</div>
					<div>
						<p>Filtrar por temperamento:</p>
						<div >
							<select
								name=""
								id=""
								onChange={(e) => {
									handlerFilter(e.target.value);
								}}
							>
								<option
									selected={currentFilter === "default"}
									value={"default"}
								>
									Todas
								</option>
								{temperaments.map((x) => (
									<option
										selected={currentFilter === x.name}
										value={x.name}
										key={x.id}
									>
										{x.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div>
						<p>Buscar:</p>
						<div >
							<i className="bx bx-search"></i>
							<form
								action=""
								onSubmit={(e) => {
									e.preventDefault();
									getDogsName(nameSearch);
								}}
							>
								<input
									type="text"
									onChange={changeHandlerName}
									
									value={nameSearch}
								/>
								<input type="submit"  />
							</form>
						</div>
					</div>
				</div>

				<div >
					{pagination.max.map((x) => (
						<button
							key={x}
							onClick={() => {
								changeHandlerPage(x);
							}}
						
						>
							{x}
						</button>
					))}
				</div>
			</div>

			<div >
				{pageView.length ? (
					pageView.map((x) => (
						<Card
							name={x.name}
							image={x.image}
							id={x.id}
							key={x.name}
							temperaments={x.temperaments}
						/>
					))
				) : (
					<p>Loading</p>
				)}
			</div>
		</div>
	);
}
