import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validatePassword = (value) => {
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*]/.test(value);
    return value.length >= 8 && hasNumber && hasSymbol;
  };

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    reset();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffe6f2, #ffb6c1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#d63384",
            marginBottom: "20px",
          }}
        >
          💖 Tech Conference Registration
        </h1>

        {isSubmitted && (
          <p
            style={{
              backgroundColor: "#d4edda",
              padding: "10px",
              borderRadius: "5px",
              color: "#155724",
              textAlign: "center",
              fontWeight: "500",
              marginBottom: "15px",
            }}
          >
            Registrasi Berhasil!
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input Group */}
          {[
            {
              label: "Nama Lengkap",
              name: "fullName",
              rules: { required: "Nama lengkap wajib diisi" },
            },
            {
              label: "Username",
              name: "username",
              rules: {
                required: "Username wajib diisi",
                minLength: { value: 6, message: "Username minimal 6 karakter" },
                maxLength: { value: 20, message: "Username maksimal 20 karakter" },
              },
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              rules: {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format email tidak valid",
                },
              },
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              rules: {
                required: "Password wajib diisi",
                validate: (value) =>
                  validatePassword(value) ||
                  "Password harus 8+ karakter, mengandung angka & simbol",
              },
            },
            {
              label: "Umur",
              name: "age",
              type: "number",
              rules: {
                required: "Umur wajib diisi",
                min: { value: 18, message: "Peserta harus berusia antara 18 dan 100 tahun" },
                max: { value: 100, message: "Peserta harus berusia antara 18 dan 100 tahun" },
              },
            },
          ].map(({ label, name, type = "text", rules }) => (
            <div key={name} style={{ marginBottom: "15px" }}>
              <label style={{ color: "#444", fontWeight: "500" }}>{label}</label>
              <input
                type={type}
                {...register(name, rules)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outlineColor: "#ff99cc",
                }}
              />
              {errors[name] && (
                <p style={{ color: "red", fontSize: "0.9em" }}>
                  {errors[name].message}
                </p>
              )}
            </div>
          ))}

          {/* Select Tiket */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#444", fontWeight: "500" }}>Tipe Tiket</label>
            <select
              {...register("ticketType", { required: "Anda harus memilih tipe tiket" })}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outlineColor: "#ff99cc",
              }}
            >
              <option value="">-- Pilih Tipe Tiket --</option>
              <option value="General Access">General Access</option>
              <option value="VIP">VIP</option>
              <option value="Student">Student</option>
            </select>
            {errors.ticketType && (
              <p style={{ color: "red", fontSize: "0.9em" }}>
                {errors.ticketType.message}
              </p>
            )}
          </div>

          {/* Website URL */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#444", fontWeight: "500" }}>Situs Web Pribadi (Opsional)</label>
            <input
              type="url"
              {...register("websiteUrl", {
                pattern: {
                  value: /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/,
                  message: "Format URL tidak valid",
                },
              })}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outlineColor: "#ff99cc",
              }}
            />
            {errors.websiteUrl && (
              <p style={{ color: "red", fontSize: "0.9em" }}>
                {errors.websiteUrl.message}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "500", color: "#444" }}>
              <input
                type="checkbox"
                {...register("agreeToTerms", {
                  required: "Anda harus menyetujui syarat dan ketentuan",
                })}
                style={{ marginRight: "8px" }}
              />
              Saya setuju dengan syarat & ketentuan
            </label>
            {errors.agreeToTerms && (
              <p style={{ color: "red", fontSize: "0.9em" }}>
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ff80b5",
              border: "none",
              borderRadius: "25px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff5ca8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff80b5")}
          >
            Daftar Sekarang 💫
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
