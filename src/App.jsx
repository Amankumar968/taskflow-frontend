import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";
import TaskList from "./components/TaskList";
import FocusTimer from "./components/FocusTimer";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AnalyticsPage from "./pages/AnalyticsPage";

import ToolsLayout, { ToolsGrid } from "./pages/tools/ToolsLayout";
import AgeCalculator from "./pages/tools/AgeCalculator";
import BMICalculator from "./pages/tools/BMICalculator";
import SalaryCalculator from "./pages/tools/SalaryCalculator";
import DateCalculator from "./pages/tools/DateCalculator";
import PercentageCalculator from "./pages/tools/PercentageCalculator";
import UnitConverter from "./pages/tools/UnitConverter";
import BasicCalculator from "./pages/tools/BasicCalculator";
import EmiCalculator from "./pages/tools/EMICalculator";
import GSTCalculator from "./pages/tools/GSTCalculator";
import CGPACalculator from "./pages/tools/CGPACalculator";
import DiscountCalculator from "./pages/tools/DiscountCalculator";
import ProfitLossCalculator from "./pages/tools/ProfitLossCalculator";
import CurrencyConverter from "./pages/tools/CurrencyConverter";

function App() {
    useEffect(() => {
        const removeGoogleBanner = () => {
            const banner = document.querySelector("iframe.goog-te-banner-frame");
            if (banner) banner.remove();

            if (document.body.style.top && document.body.style.top !== "0px") {
                document.body.style.top = "0px";
            }
            if (document.documentElement.style.top && document.documentElement.style.top !== "0px") {
                document.documentElement.style.top = "0px";
            }
        };

        removeGoogleBanner();

        const observer = new MutationObserver(removeGoogleBanner);
        observer.observe(document.body, { childList: true, subtree: true });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });

        return () => observer.disconnect();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Sidebar layout ke andar sab protected pages — login zaroori hai */}
                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/focus-timer" element={<FocusTimer />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />

                    <Route path="/tools" element={<ToolsLayout />}>
                        <Route index element={<ToolsGrid />} />
                        <Route path="age-calculator" element={<AgeCalculator />} />
                        <Route path="bmi-calculator" element={<BMICalculator />} />
                        <Route path="salary-calculator" element={<SalaryCalculator />} />
                        <Route path="date-calculator" element={<DateCalculator />} />
                        <Route path="percentage-calculator" element={<PercentageCalculator />} />
                        <Route path="unit-converter" element={<UnitConverter />} />
                        <Route path="calculator" element={<BasicCalculator />} />
                        <Route path="emi-calculator" element={<EmiCalculator />} />
                        <Route path="gst-calculator" element={<GSTCalculator />} />
                        <Route path="cgpa-calculator" element={<CGPACalculator />} />
                        <Route path="discount-calculator" element={<DiscountCalculator />} />
                        <Route path="profit-loss-calculator" element={<ProfitLossCalculator />} />
                        <Route path="currency-converter" element={<CurrencyConverter />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;