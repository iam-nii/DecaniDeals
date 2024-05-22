import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState("");

  const onChangeMessage = (e) =>{
    setMessage(e.target.value);
  }

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setSeller(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeller();
  }, [listing.userRef]);

  return (
    <div>
      {seller && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{seller.username} for <span className="font-semibold">{listing.name.toLowerCase}</span></span>
          </p>
          <textarea name="message" id="message" rows="2" value={message} onChange={onChangeMessage} placeholder="Enter your message here..." className="w-full rounded-lg border p-3"></textarea>
          <Link to={`mailto:${seller.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-slate-600 text-white text-center p-3 uppercase rounded-lg hover:opacity-95">
          Отправить сообщение 
          </Link>
        </div>
      )}
    </div>
  );
}
