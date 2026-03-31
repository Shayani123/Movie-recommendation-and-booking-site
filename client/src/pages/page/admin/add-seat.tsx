import AdminGuard from "@/components/AdminGaurd";

export default function AddSeat() {
    return (
        <AdminGuard>
            <div>Hello</div>
        </AdminGuard>
    );
}