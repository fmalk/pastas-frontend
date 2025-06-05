import styles from "./page.module.css";
import Grid from "@/components/Grid";

export default function Home() {
    return (
        <div className={styles.page}>
            <header>
                <h1>
                    Pastas
                </h1>
            </header>
            <main className={styles.main}>
                <Grid />
            </main>
            <footer className={styles.footer}>
                Demonstração feita por Fernando Piancastelli
            </footer>
        </div>
    );
}
