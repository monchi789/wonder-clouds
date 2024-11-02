import ContactForm from "@/components/public/contactanos/ContactForm";
import ContactTitle from "@/components/public/contactanos/ContactTitle";

const Contactanos = () => {
  return (
    <>
      <div className="flex flex-col items-center my-6">
        
        <ContactTitle />

      </div>

      <div className="container flex flex-col w-full items-center lg:w-3/4 mx-auto mt-12">

        <ContactForm />

      </div>
    </>
  );
};

export default Contactanos;
