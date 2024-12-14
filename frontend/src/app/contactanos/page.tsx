import ContactForm from "@/app/contactanos/components/ContactForm";
import ContactTitle from "@/app/contactanos/components/ContactTitle";

const Contactanos = () => {
  return (
    <>
        
      <ContactTitle />

      <div className="container flex flex-col w-full items-center lg:w-3/4 mx-auto mt-12">

      <ContactForm />

      </div>
    </>
  );
};

export default Contactanos;
