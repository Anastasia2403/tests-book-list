import React from 'react';
import '../Footer/Footer.css';

export const Footer: React.FC = React.memo(() => (
	<footer className="footer">
		<div className="content has-text-centered">
			<p>
				<strong>Created</strong> by{' '}
				<a href="https://github.com/Anastasia2403" target="_blank" rel="noopener noreferrer">
          Anastasiia Yuzyfyshyn
				</a>
			</p>
		</div>
	</footer>
));
