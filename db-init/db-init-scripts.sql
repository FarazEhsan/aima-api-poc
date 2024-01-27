CREATE OR REPLACE FUNCTION get_restocking_amount()
RETURNS TABLE (
    productname character varying(100),
    unit productvariant_unit_enum,
    averageSalesPerDay INTEGER,
    restockingAmount INTEGER,
    currentstock INT,
    minimumstock INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.productname,
        pv.unit,
        ROUND(AVG(s.quantity))::INTEGER AS "averageSalesPerDay",
        ROUND((AVG(s.quantity) * (EXTRACT(DAY FROM DATE_TRUNC('MONTH', CURRENT_DATE) + INTERVAL '1 MONTH' - INTERVAL '1 DAY') - EXTRACT(DAY FROM CURRENT_DATE))) - (pv.currentstock - SUM(s.quantity)))::INTEGER AS "restockingAmount",
        pv.currentstock,
        pv.minimumstock
    FROM 
        public.sale s
    JOIN 
        public.productvariant pv ON s."productVariantId" = pv.id
    JOIN 
        public.product p ON pv."productId" = p.id
    WHERE 
        EXTRACT(MONTH FROM s."updDate") = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(DAY FROM s."updDate") <= EXTRACT(DAY FROM CURRENT_DATE)
    GROUP BY 
        p.productname, pv.unit, pv.currentstock, pv.minimumstock;
END;
$$;