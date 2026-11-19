import { Form } from './components/Form/Form'
import { Analytics } from '@vercel/analytics/react'
import { Helmet } from 'react-helmet'

function App() {
	return (
		<>
			<Helmet>
				<title>Adolat qutisi | Jizzah shahar 27-maktab</title>
				<meta
					name='description'
					content="Adolat qutisi - Jizzah shahar 27-maktab o'quvchilarining va o'quvchilarining muammolariga/shikoyatlariga yechim beradigan loyiha. Bu platforma orqali muammoga yechim toping."
				/>
				<meta
					name='keywords'
					content="Adolat qutisi, Jizzah shahar 27-maktab, 27-maktab, adolat, qutisi, Jizzax, begidev, o'ziga ishonch, maktab loyihasi, Jizzah adolat, adolat quti, ADOLAT QUTISI, Адолат қутиси, Жиззах шахар 27-мактаб, 27-мактаб, адолат, қутиси, Жиззах, бегидев, ўзинга ишонч, мактаб лойиҳаси, Жиззах адолат, адолат қути, ADOLAT QUTISI					"
				/>
				<meta name='author' content='BegiDev, Begzod Abduhamidov' />
			</Helmet>
			<div className='flex justify-center items-center h-screen px-4 md:px-0'>
				<Form />
				<Analytics />
			</div>
		</>
	)
}

export default App
