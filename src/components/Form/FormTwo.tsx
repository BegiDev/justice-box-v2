import { useState } from 'react'
import { TabsContent } from '@radix-ui/react-tabs'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'
import { Helmet } from 'react-helmet'

interface FormTwoProps {
	onSuccess: () => void
}

function FormTwo({ onSuccess }: FormTwoProps) {
	const telegramBotId = import.meta.env.VITE_TELEGRAM_BOT_ID
	const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const [openAlert, setOpenAlert] = useState(false)

	const validateForm = () => {
		if (message.length < 10) {
			setError('Xabar 10 ta harfdan kam bo`lmasligi kerak.')
			return false
		}
		setError('')
		return true
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) return

		const telegramMessage = `Anonim:\n\nXabar📝: ${message}`

		try {
			const response = await fetch(
				`https://api.telegram.org/bot${telegramBotId}/sendMessage`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'cache-control': 'no-cache',
					},
					body: JSON.stringify({
						chat_id: telegramChatId,
						text: telegramMessage,
					}),
				}
			)

			if (!response.ok) {
				setError('Xatolik yuz berdi.')
			} else {
				setMessage('')
				setOpenAlert(true)
				onSuccess()
			}
		} catch (error) {
			setError('Xatolik yuz berdi.')
		}
	}

	return (
		<>
			<Helmet>
				<title>Adolat Qutisi | Jizzah Shahar 27-maktab</title>
				<meta
					name='description'
					content="Adolat qutisi orqali siz o'z fikrlaringizni va takliflaringizni yozishingiz mumkin. Jizzah shahar 27-maktab loyihasi."
				/>
				<meta
					name='keywords'
					content="Adolat qutisi, Jizzah shahar 27-maktab, 27-maktab, adolat, qutisi, Jizzax, begidev, o'ziga ishonch, maktab loyihasi, Jizzah adolat, adolat quti, ADOLAT QUTISI, Адолат қутиси, Жиззах шахар 27-мактаб, 27-мактаб, адолат, қутиси, Жиззах, бегидев, ўзинга ишонч, мактаб лойиҳаси, Жиззах адолат, адолат қути, ADOLAT QUTISI					"
				/>
				<meta name='author' content='BegiDev, Begzod Abduhamidov' />
			</Helmet>
			<TabsContent value='password' className='space-y-2 mt-2'>
				<Card>
					<CardHeader>
						<CardTitle>Ochiqlanmagan</CardTitle>
						<CardDescription>
							Siz yozgan xabarlar bizga anonim sifatida keladi.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2 mt-[-15px]'>
						<form onSubmit={onSubmit}>
							<div className='space-y-1 mt-2'>
								<Label htmlFor='message'>Shikoyat/Taklif</Label>
								<Textarea
									id='message'
									name='message'
									placeholder='Taklifim/Shikoyatim bor edi'
									onChange={e => setMessage(e.target.value)}
									value={message}
									required
								/>
								{error && <p className='text-red-500 text-sm'>{error}</p>}
							</div>
							<Button type='submit' className='mt-4'>
								Jo`natish
							</Button>
						</form>
					</CardContent>
				</Card>
			</TabsContent>
			<AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Xabar yuborildi!</AlertDialogTitle>
						<AlertDialogDescription>
							Albatta siz yuborgan shikoyat/taklif ko'rib chiqiladi.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogAction onClick={() => setOpenAlert(false)}>
						Rahmat!
					</AlertDialogAction>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default FormTwo
