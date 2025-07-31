import { LoadingContainer, LogingMaloi } from "./LoadingError.styled";

export const Loading = () => {
    return (
        <LoadingContainer>
            <p>Loading...</p>
            <LogingMaloi>
                Mariano è un tirchio e usa il server più economico,
                che rimane offline in attesa della prima chiamata.
                Aspetta un po&apos; e ti risponderà.
            </LogingMaloi>
        </LoadingContainer>
    );
}