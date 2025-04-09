import Banner from "../components/Banner";
import Feature from "../components/Feature";
import featureData from "../data/featureData";
export default function Home() {
  return (
    <>
      <Banner />
      <section className="feature">
        {featureData.map((item) => (
          <Feature key={item.id} {...item} />
        ))}
      </section>
    </>
  );
}
