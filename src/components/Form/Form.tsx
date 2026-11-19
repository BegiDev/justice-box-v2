import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import InputMask from 'react-input-mask'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import FormTwo from './FormTwo'
import { Helmet } from 'react-helmet'

interface FormErrors {
	name: string
	phone: string
	message: string
}

export function Form() {
	const telegramBotId = import.meta.env.VITE_TELEGRAM_BOT_ID
	const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [tabValue, setTabValue] = useState<string>('account')
	const [phone, setPhone] = useState<string>('+998')
	const [name, setName] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [errors, setErrors] = useState<FormErrors>({
		name: '',
		phone: '',
		message: '',
	})
	const [openAlert, setOpenAlert] = useState<boolean>(false)

	const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value)
	}

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value)
	}

	const validateForm = (): boolean => {
		let formErrors: FormErrors = { name: '', phone: '', message: '' }
		let isValid = true

		if (name.length < 3) {
			formErrors.name = 'Ism 3 ta harfdan kam bo`lmasligi kerak.'
			isValid = false
		}

		const phoneRegex = /^\+998 \d{2} \d{3} \d{2} \d{2}$/
		if (!phoneRegex.test(phone)) {
			formErrors.phone =
				'Telefon raqam to`liq yozilishi kerak: +998 xx xxx xx xx.'
			isValid = false
		}

		if (message.length < 10) {
			formErrors.message = 'Xabar 10 ta harfdan kam bo`lmasligi kerak.'
			isValid = false
		}

		setErrors(formErrors)
		return isValid
	}

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!validateForm()) return

		setIsLoading(true)

		const telegramMessage = `
      Ochiqlangan:
      
Ism👦:  ${name}
Telefon☎️:  ${phone}
Xabar📝:  ${message}
    `

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

			if (response.ok) {
				setOpenAlert(true)
				setTabValue('password')
			} else {
				alert('Xatolik yuz berdi.')
			}
		} catch (error) {
			alert('Xatolik yuz berdi.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleFormTwoSubmit = () => {
		setOpenAlert(true)
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
			<Tabs className='w-[400px]' value={tabValue} onValueChange={setTabValue}>
				<TabsList className='grid w-full grid-cols-2 mt-2'>
					<TabsTrigger value='account'>Ochiqlangan</TabsTrigger>
					<TabsTrigger value='password'>Ochiqlanmagan</TabsTrigger>
				</TabsList>

				<TabsContent value='account'>
					<Card>
						<CardHeader>
							<CardTitle>Ochiqlangan</CardTitle>
							<CardDescription>
								Siz yozgan xabarlar bizga kim tomonidan yozilganligi ko`rinadi.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2 mt-[-15px]'>
							<form onSubmit={onSubmit}>
								<div className='space-y-1'>
									<Label htmlFor='name'>Ism</Label>
									<Input
										id='name'
										name='name'
										placeholder='Begzod'
										required
										value={name}
										onChange={handleNameChange}
									/>
									{errors.name && (
										<p className='text-red-500 text-sm'>{errors.name}</p>
									)}
								</div>
								<div className='space-y-1 mt-2'>
									<Label htmlFor='phone'>Telefon raqam</Label>
									<InputMask
										id='phone'
										name='phone'
										mask='+998 ** *** ** **'
										placeholder='+998 __ __ __ __ __'
										value={phone}
										onChange={handlePhoneChange}
										alwaysShowMask={true}
									>
										{inputProps => <Input {...inputProps} />}
									</InputMask>

									{errors.phone && (
										<p className='text-red-500 text-sm'>{errors.phone}</p>
									)}
								</div>

								<div className='space-y-1 mt-2'>
									<Label htmlFor='message'>Shikoyat/Taklif</Label>
									<Textarea
										id='message'
										name='message'
										placeholder='Taklifim/Shikoyatim bor edi'
										required
										value={message}
										onChange={handleMessageChange}
									/>
									{errors.message && (
										<p className='text-red-500 text-sm'>{errors.message}</p>
									)}
								</div>
								<Button type='submit' disabled={isLoading} className='mt-4'>
									{isLoading ? 'Yuborilyapti...' : 'Jo`natish'}
								</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value='password'>
					<FormTwo onSuccess={handleFormTwoSubmit} />
				</TabsContent>
			</Tabs>

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
