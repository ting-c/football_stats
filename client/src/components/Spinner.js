import React from 'react';

export default function Spinner() {
  return (
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div
					className="spinner-border text-info"
					style={{ height: "2rem" }}
					role="status"
				>
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		</div>
	);
}
