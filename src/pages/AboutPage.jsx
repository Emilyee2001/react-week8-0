export default function AboutPage() {

  return (<>
    <div className="bg position-relative" style={{ backgroundImage: `url(https://github.com/Emilyee2001/react-week5-1/blob/main/src/assets/images/banner-4.png?raw=true)`, height: '30vh' }}>
      <h1 className="fs-3 fs-md-1 fs-lg-display-1 text-gray-700 position-absolute top-50 start-50 translate-middle">關於我們</h1>
    </div>
    <div className="bg-gray-50">
      <div className="container py-4 py-md-5 d-flex justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-center">
            <h3 className="text-center fs-4 fs-md-1 mb-4 mb-md-5 line-deco">品牌故事</h3>
          </div>
          <h6 className="text-center text-primary-700 fs-md-5 mb-4 mb-md-5">創造味蕾的每一份感動，從香料開始</h6>
          <div className="ratio ratio-4x3 mb-4 mb-md-5">
            <img className="img-circle-fade" src="../assets/images/about01.png" alt="about01" />
          </div>
          <p className="fs-md-lg mb-4">ExotiSpice異國香堅信，料理不僅僅是填飽肚子的工具，更是一種情感的表達與文化的連結。我們以「香料」為核心理念，精心挑選來自世界各地的優質香料，滿足現代人對健康、美味與異國風味的追求。我們深知各地的飲食文化與多樣化的烹飪方式，因此特別注重香料的品質與來源，讓每一個香料都能完美融入你的料理中。</p>
          <p className="fs-md-lg">在ExotiSpice異國香，我們不僅關注香料的風味與質量，還堅持永續發展的理念。我們相信，好的香料應該同時考慮到對環境的影響，讓每一個家庭在享受美食的同時，也能為地球盡一份心力。
            選擇ExotiSpice異國香，讓我們一同探索異國風味，調製出充滿香氣與情感的料理，讓每一個平凡的日常都變得更有意義。品味異國，調香生活，從這一刻開始。</p>
        </div>
      </div>
    </div>
    <div className="container py-4 py-md-5">
      <div className="d-flex justify-content-center">
        <h3 className="text-center fs-4 fs-md-1 mb-4 mb-md-5 line-deco">社會責任</h3>
      </div>
      <div className="row mb-4 mb-md-5">
        <div className="col-md-6">
          <img className="img-circle-fade" src="../assets/images/about02.png" alt="about02" />
        </div>
        <div className="col-md-6 my-auto">
          <h4 className="text-primary-700 mb-3">守護動物與推廣蔬食教育</h4>
          <p className="fs-lg">ExotiSpice 異國香深信，飲食的美好應該延伸到每一個生命。因此，我們積極支持動物權益，致力於減少動物實驗的需求。我們與多家非營利組織合作，共同推動蔬食教育，讓更多人了解植物性飲食對健康與環境的益處，同時減少對動物的傷害。我們相信，透過提高大眾的認知，可以逐漸改變社會對動物的態度，創造一個更加友善的環境。</p>
        </div>
      </div>
      <div className="row flex-md-row-reverse">
        <div className="col-md-6">
          <img className="img-circle-fade" src="../assets/images/about03.png" alt="about03" />
        </div>
        <div className="col-md-6 my-auto">
          <h4 className="text-primary-700 mb-3">停止動物實驗</h4>
          <p className="fs-lg">ExotiSpice 異國香承諾在我們的產品研發過程中，絕不進行動物實驗。我們選擇對動物無害的材料，並不斷尋找更具永續性的替代方案，為動物與地球的未來盡一份心力。我們期望透過這些實際行動，帶動更多企業和個人一起加入，為推動動物權益與保護地球而努力。</p>
        </div>
      </div>

    </div>
  </>)
}