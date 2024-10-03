import { Link } from "react-router-dom";
import "./Home.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function Home() {
  return (
    <div className="home-container">
      <span className="book-icon-container">
        <MenuBookIcon sx={{ fontSize: 100 }} />
      </span>

      <h1 className="home-headline">LIBRARY-APP</h1>
      <p className="home-paragraph">
        Kütüphane yönetim sistemi hakkında kısa bir bilgilendirme!
      </p>
      <ul className="home-list">
        <li className="home-list-item">
          Yazar: Kütüphanedeki kitapların yazar bilgilerini ekleyebilir ve güncelleyebilirsiniz.
        </li>
        <li className="home-list-item">
          Kitap: Kütüphaneye yeni kitaplar ekleyebilir, mevcut kitapları düzenleyebilirsiniz.
        </li>
        <li className="home-list-item">
          Kitap ödünç alma: Kitap ödünç alma işlemleri ve raporları oluşturabilirsiniz.
        </li>
        <li className="home-list-item">
          Kategori: Kitapları farklı kategorilere ayırarak yönetebilirsiniz.
        </li>
        <li className="home-list-item">
          Yayıncı: Kitapların yayınevi bilgilerini ekleyebilir ve güncelleyebilirsiniz.
        </li>
      </ul>
      <p className="home-paragraph">
        &quot;Kitaplar, medeniyetin en güçlü köprüleridir.&quot;
      </p>
      <Link to="/library">
        <button className="home-button">Hemen Keşfet!</button>
      </Link>
    </div>
  );
}

export default Home;