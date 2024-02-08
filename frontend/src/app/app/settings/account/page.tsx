'use client';
import Container from "@/components/Container"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import authSlice from "@/redux/features/auth/authSlice";
import ChangePassword from "@/components/settings/ChangePassword";

const Account = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const logout = () => {
		dispatch(authSlice.actions.logout())
		router.push("/login")
	}

	return (
		<Container className="flex-col gap-10 items-center justify-center text-custom-blue font-bold">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold">Logout ? </h2>
				<p className="opacity-60">logout from current account</p>
				<button
					onClick={logout}
					className="px-2 py-1 w-20 bg-custom-red font-bold rounded-lg"
				>
					Logout
				</button>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold">Change password</h2>
				<p className="opacity-60">change your password</p>
				<ChangePassword>
					<div
						className="px-2 py-1 w-32 bg-custom-red font-bold rounded-lg"
					>
						Change Password
					</div>
				</ChangePassword>
			</div>
			<div className="flex flex-col gap-2">
			</div>
		</Container>
	)
}

export default Account
