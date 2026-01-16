import { useState } from "react";
import ChoiceState from "../component/ChoiceState";
import { AffitoEntity } from "../entity/AffitoEntity";
import { Photo, Photos, PopUpInfo } from "./UdineMapComponent.styled";


function PopupContent({
    affito,
    onMouseEnter,
    onMouseLeave,
    closePopup
}: {
    affito: AffitoEntity;
    onMouseEnter: (photoUrl: string, event: React.MouseEvent<HTMLImageElement>) => void;
    onMouseLeave: () => void;
    closePopup?: () => void;
}) {
    const [currentPage, setCurrentPage] = useState(0);
    const propt = affito.realEstate.properties;
    const PHOTOS_PER_PAGE = 9;
    const totalPhotos = propt.multimedia.photos.length;
    const totalPages = Math.ceil(totalPhotos / PHOTOS_PER_PAGE);

    const startIndex = currentPage * PHOTOS_PER_PAGE;
    const endIndex = startIndex + PHOTOS_PER_PAGE;
    const currentPhotos = propt.multimedia.photos.slice(startIndex, endIndex);

    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };
    const openImg = (photoUrl: string): void => {
        open(photoUrl, '_blank');
    }
    function getMainFeaturesPropertie(propertie: string): string {
        if (!propt || !propt.mainFeatures)
            return '**'
        const choiceProp = propt.mainFeatures.find(x => x.type === propertie)
        if (!choiceProp)
            return '**'
        return choiceProp?.compactLabel || choiceProp?.label || '**'
    }
    function getPrimaryFeaturesPropertie(propertie: string): string {
        if (!propt || !propt.primaryFeatures)
            return '🟡'
        const choiceProp = propt.primaryFeatures.find(x => x.name === propertie)
        if (!choiceProp)
            return '🟡'
        return choiceProp?.value ? "♿" : "❌";
    }


    return (
        <div>
            <ChoiceState stateMaloi={affito.stateMaloi} id={affito._id} closePopup={closePopup} />
                {affito.realEstate.title} 
            
                <PopUpInfo title="floor">{propt.floor?.abbreviation}</PopUpInfo>
                <PopUpInfo title="elevator">{getMainFeaturesPropertie('elevator')}</PopUpInfo>
                <PopUpInfo title="m²">{getMainFeaturesPropertie('surface')}</PopUpInfo>
                <PopUpInfo title="Disable">{getPrimaryFeaturesPropertie('Accesso per disabili')}</PopUpInfo>
            
            <Photos>
                {currentPhotos.map((photo, index) => {
                    const largeUrl = photo.urls.xxl || photo.urls.large || photo.urls.medium || photo.urls.small;


                    return (
                        <Photo
                            key={startIndex + index}
                            src={photo.urls.small}
                            alt={`Photo ${startIndex + index + 1}`}
                            onMouseEnter={(e) => onMouseEnter(largeUrl, e)}
                            onMouseLeave={onMouseLeave}
                            onClick={() => openImg(largeUrl)}
                        />
                    );
                })}
            </Photos>
            {totalPages > 1 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '10px'
                }}>
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 0}
                        style={{
                            padding: '5px 10px',
                            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === 0 ? 0.5 : 1,
                            border: '1px solid #1976d2',
                            background: 'white',
                            borderRadius: '4px'
                        }}
                    >
                        ←
                    </button>
                    <span style={{ fontSize: '12px' }}>
                        {currentPage + 1} / {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages - 1}
                        style={{
                            padding: '5px 10px',
                            cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                            border: '1px solid #1976d2',
                            background: 'white',
                            borderRadius: '4px'
                        }}
                    >
                        →
                    </button>
                </div>
            )}
            <a
                href={`https://www.immobiliare.it/annunci/${affito._id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1976d2', textDecoration: 'underline' }}
            >
                <h2>{affito.realEstate.price.formattedValue}</h2>
            </a>
        </div>
    );
}

export default PopupContent;