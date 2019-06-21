import App from './App.svelte';

var element = document.getElementById('splash');
element.parentNode.removeChild(element);

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;