import { useEffect, useState } from "react";

function App() {
  const [mssv, setMssv] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");

  const [students, setStudents] = useState([]);

  // ID sinh viên đang sửa
  const [editingId, setEditingId] = useState(null);

  // =========================
  // LẤY DANH SÁCH SINH VIÊN
  // =========================
  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");

      if (!response.ok) {
        throw new Error("Không thể lấy danh sách sinh viên");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không lấy được danh sách sinh viên!");
    }
  };

  // =========================
  // CHẠY KHI MỞ TRANG
  // =========================
  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // THÊM / CẬP NHẬT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mssv || !hoTen || !email) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      let response;

      // ĐANG SỬA
      if (editingId) {
        response = await fetch(`/api/students/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: mssv,
            name: hoTen,
            email: email,
          }),
        });
      }

      // ĐANG THÊM
      else {
        response = await fetch("/api/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: mssv,
            name: hoTen,
            email: email,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra");
      }

      if (editingId) {
        alert("Cập nhật sinh viên thành công!");
      } else {
        alert("Thêm sinh viên thành công!");
      }

      // Xóa form
      setMssv("");
      setHoTen("");
      setEmail("");

      // Thoát chế độ sửa
      setEditingId(null);

      // Tải lại danh sách
      fetchStudents();

    } catch (error) {
      console.error("Lỗi:", error);
      alert(error.message);
    }
  };

  // =========================
  // BẤM NÚT SỬA
  // =========================
  const handleEdit = (student) => {
    setEditingId(student._id);
    setMssv(student.studentId);
    setHoTen(student.name);
    setEmail(student.email);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // HỦY SỬA
  // =========================
  const handleCancelEdit = () => {
    setEditingId(null);
    setMssv("");
    setHoTen("");
    setEmail("");
  };

  // =========================
  // XÓA SINH VIÊN
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sinh viên này không?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể xóa sinh viên");
      }

      alert("Xóa sinh viên thành công!");

      // Nếu đang sửa sinh viên vừa xóa
      if (editingId === id) {
        handleCancelEdit();
      }

      // Tải lại danh sách
      fetchStudents();

    } catch (error) {
      console.error("Lỗi:", error);
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "30px auto",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        {editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}
      </h1>

      {/* =========================
          FORM
      ========================= */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>MSSV</label>
          <br />

          <input
            type="text"
            placeholder="Nhập MSSV"
            value={mssv}
            onChange={(e) => setMssv(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Họ tên</label>
          <br />

          <input
            type="text"
            placeholder="Nhập họ tên"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <br />

          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button type="submit">
          {editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{ marginLeft: "10px" }}
          >
            Hủy sửa
          </button>
        )}
      </form>

      <hr style={{ margin: "30px 0" }} />

      {/* =========================
          DANH SÁCH
      ========================= */}
      <h2>Danh sách sinh viên</h2>

      {students.length === 0 ? (
        <p>Chưa có sinh viên.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>

                <td>{student.name}</td>

                <td>{student.email}</td>

                <td>
                  <button
                    onClick={() => handleEdit(student)}
                    style={{ marginRight: "5px" }}
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(student._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
