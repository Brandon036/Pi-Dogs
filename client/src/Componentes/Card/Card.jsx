import React from "react";

import { Link } from "react-router-dom";

export default function Card(props) {
	return (
		<Link to={`/dogs/${props.id}`} >
			<div  key={props.id}>
				<div >
					<img src={props.image} alt="" />
				</div>
				<div >
					<h2>{props.name}</h2>
					<div>
						<p >
							Height: {props.height}
						</p>
					</div>

					<div >
						<p >
							{ props.temperaments.map((y) => (
								<span >{y}</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}