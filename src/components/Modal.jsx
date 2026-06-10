import { useEffect, useRef } from 'react';

const imagesGlob = import.meta.glob('/src/assets/images/**/*', { eager: true });
const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('//') || path.startsWith('data:')) {
    return path;
  }
  return imagesGlob[path]?.default || path;
};

export default function Modal({ isOpen, item, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleBackdropClick = (event) => {
    const dialog = dialogRef.current;
    if (!dialog || event.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isDialogContent = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );

    if (!isDialogContent) {
      onClose();
    }
  };

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
      className="glass-dark max-w-2xl w-[90%] rounded-3xl p-0 overflow-hidden shadow-2xl relative border border-white/10 text-white outline-none"
    >
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center text-white border border-white/10 cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video / Image Container */}
        <div className={`w-full ${item.aspect === 'aspect-[9/16]' ? 'aspect-[9/16] max-h-[70vh]' : 'aspect-video'} overflow-hidden bg-gray-900 relative`}>
          {isOpen && (
            item.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&controls=1&playsinline=1`}
                className="w-full h-full"
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img 
                src={getAssetUrl(item.image)} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />
            )
          )}
        </div>

        {/* Details Container */}
        <div className="p-6 md:p-8">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider text-orange-400 uppercase mb-3">
            {item.category}
          </span>
          <h3 id="modal-title" className="text-2xl md:text-3xl font-bold mb-4 text-white">
            {item.title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="px-6 py-2.5 bg-white text-gray-900 rounded-full font-medium text-sm hover:bg-orange-400 hover:text-accent transition-all inline-flex items-center gap-2"
            >
              <span>Launch Project</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white/10 text-white rounded-full font-medium text-sm hover:bg-white/20 transition-colors border border-white/10 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
