
import { useEffect, useState } from "react";

// Địa chỉ Backend trên Render
const API_URL = "https://mern-backend-236167-ddt2.onrender.com";

function App() {
  const [mssv, setMssv] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");

  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // LẤY DANH SÁCH SINH VIÊN
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/students`);

      if (!response.ok) {
        throw new Error("Không thể lấy danh sách sinh viên");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
      alert("Không lấy được danh sách sinh viên!");
    }
  };

  // TỰ ĐỘNG LẤY DANH SÁCH KHI MỞ TRANG
  useEffect(() => {
    fetchStudents();
  }, []);

  // THÊM / CẬP NHẬT SINH VIÊN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mssv.trim() || !hoTen.trim() || !email.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      let response;

      const studentData = {
        studentId: mssv.trim(),
        name: hoTen.trim(),
        email: email.trim(),
      };

      if (editingId) {
        // CẬP NHẬT
        response = await fetch(
          `${API_URL}/api/students/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(studentData),
          }
        );
      } else {
        // THÊM MỚI
        response = await fetch(`${API_URL}/api/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra");
      }

      alert(
        editingId
          ? "Cập nhật sinh viên thành công!"
          : "Thêm sinh viên thành công!"
      );

      setMssv("");
      setHoTen("");
      setEmail("");
      setEditingId(null);

      await fetchStudents();
    } catch (error) {
      console.error("Lỗi thêm/cập nhật:", error);
      alert(error.message || "Không thể kết nối đến máy chủ!");
    }
  };

  // CHỌN SINH VIÊN ĐỂ SỬA
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

  // HỦY SỬA
  const handleCancelEdit = () => {
    setEditingId(null);
    setMssv("");
    setHoTen("");
    setEmail("");
  };

  // XÓA SINH VIÊN
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sinh viên này không?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/students/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể xóa sinh viên");
      }

      alert("Xóa sinh viên thành công!");

      if (editingId === id) {
        handleCancelEdit();
      }

      await fetchStudents();
    } catch (error) {
      console.error("Lỗi xóa sinh viên:", error);
      alert(error.message || "Không thể kết nối đến máy chủ!");
    }
  };

  return (
    <div
      style={{
        width: "700px",
        maxWidth: "95%",
        margin: "30px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Quản lý sinh viên - Phiên bản 2.0
      </h1>

      {/* FORM NHẬP THÔNG TIN */}
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

      {/* DANH SÁCH SINH VIÊN */}
      <h2>Danh sách sinh viên</h2>

      {students.length === 0 ? (
        <p>Chưa có sinh viên.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
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
                      type="button"
                      onClick={() => handleEdit(student)}
                      style={{ marginRight: "5px" }}
                    >
                      Sửa
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(student._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
