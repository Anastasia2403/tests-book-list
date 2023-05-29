import React from 'react';

interface Props {
  value: string;
  onFilterChange: (value: string) => void;
}

export const FilterBar: React.FC<Props> = React.memo(({ value, onFilterChange }) => {
	const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onFilterChange(event.target.value);
	};

	return (
		<div className="control">
			<div className="select">
				<select value={value} onChange={handleFilterChange}>
					<option value={'all'}>Show All</option>
					<option value={'active'}>Show Active</option>
					<option value={'deactivated'}>Show Deactivated</option>
				</select>
			</div>
		</div>
	);
});
