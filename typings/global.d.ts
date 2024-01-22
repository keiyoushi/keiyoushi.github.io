declare namespace Goatcounter {
    interface CountVars {
        event?: boolean;
        path?: string;
        title?: string;
        referrer?: string;
    }

    interface Goatcounter {
        no_onload?: boolean;
        count?: (vars: CountVars) => void;
    }
}

declare global {
    interface Window {
        goatcounter?: Goatcounter.Goatcounter;
    }
}

export {}
