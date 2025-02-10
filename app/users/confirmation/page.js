"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Suspense } from "react";
function ConfirmationContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    return (
        <div>
            <h1>Confirmation Page</h1>
            <p>Token: {token}</p>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConfirmationContent />
        </Suspense>
    );
}
