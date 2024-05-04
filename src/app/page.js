"use client"

// ScopedCSSVariables.js
import { useEffect, useRef } from 'react';

export default function ScopedCSSVariables() {

  const inputRefs = useRef([]);

  useEffect(() => {
		const handleUpdate = () => {
			const inputs = inputRefs.current;
			inputs.forEach((input) => {
				const suffix = input.dataset.sizing || '';
				document.documentElement.style.setProperty(
					`--${input.name}`,
					input.value + suffix
				);
			});
		};

		inputRefs.current.forEach((input) => {
			input.addEventListener('change', handleUpdate);
			input.addEventListener('mousemove', handleUpdate);
		});

		return () => {
			inputRefs.current.forEach((input) => {
				input.removeEventListener('change', handleUpdate);
				input.removeEventListener('mousemove', handleUpdate);
			});
		};
  }, []);

	return (
		<div className="flex flex-col justify-center">
			<h2>
				Update CSS Variables with <span className="hl">JS</span>
			</h2>

			<div className="controls">
				<label htmlFor="spacing">Spacing:</label>
				<input
					id="spacing"
					type="range"
					name="spacing"
					min="10"
					max="200"
					defaultValue="10"
					data-sizing="px"
					ref={(el) => (inputRefs.current[0] = el)}
				/>

				<label htmlFor="blur">Blur:</label>
				<input
					id="blur"
					type="range"
					name="blur"
					min="0"
					max="25"
					defaultValue="10"
					data-sizing="px"
					ref={(el) => (inputRefs.current[1] = el)}
				/>

				<label htmlFor="base">Base Color</label>
				<input
					id="base"
					type="color"
					name="base"
					defaultValue="#ffc600"
					ref={(el) => (inputRefs.current[2] = el)}
				/>
			</div>

			<img
				src="https://source.unsplash.com/7bwQXzbF6KE/800x500"
				className="w-96 h-96 mx-auto"
			/>
		</div>
	);
}
