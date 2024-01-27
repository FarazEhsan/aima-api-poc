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

DO $$
DECLARE 
    cleaningSuppliesId INTEGER;
    personalCareId INTEGER;
    detergentId INTEGER;
    soapId INTEGER;
BEGIN
    -- Insert into productcategory if not exists
    IF NOT EXISTS (SELECT 1 FROM public.productcategory WHERE categoryname = 'Cleaning Supplies') THEN
        INSERT INTO public.productcategory (categoryname, categorydescription) VALUES ('Cleaning Supplies', 'Cleaning Supplies Description 50 chars is good');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.productcategory WHERE categoryname = 'Personal Care') THEN
        INSERT INTO public.productcategory (categoryname, categorydescription) VALUES ('Personal Care', 'Personal Care Description 50 chars is good');
    END IF;

    -- Get the id of the inserted/already existing categories
    cleaningSuppliesId := (SELECT id FROM public.productcategory WHERE categoryname = 'Cleaning Supplies');
    personalCareId := (SELECT id FROM public.productcategory WHERE categoryname = 'Personal Care');

    -- Insert into product if not exists
    IF NOT EXISTS (SELECT 1 FROM public.product WHERE productname = 'Detergent') THEN
        INSERT INTO public.product (productname, productdescription, "categoryId") VALUES ('Detergent', 'Detergent Description 50 chars is good', cleaningSuppliesId);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.product WHERE productname = 'Soap') THEN
        INSERT INTO public.product (productname, productdescription, "categoryId") VALUES ('Soap', 'Soap Description 50 chars is good', personalCareId);
    END IF;

    -- Get the id of the inserted/already existing products
    detergentId := (SELECT id FROM public.product WHERE productname = 'Detergent');
    soapId := (SELECT id FROM public.product WHERE productname = 'Soap');

    -- Insert into productvariant if not exists
    IF NOT EXISTS (SELECT 1 FROM public.productvariant WHERE "productId" = detergentId AND unit = 'PC') THEN
        INSERT INTO public.productvariant (unit, currentstock, minimumstock, "productId") VALUES ('PC', 100, 10, detergentId);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.productvariant WHERE "productId" = detergentId AND unit = 'KG') THEN
        INSERT INTO public.productvariant (unit, currentstock, minimumstock, "productId") VALUES ('KG', 200, 20, detergentId);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.productvariant WHERE "productId" = soapId AND unit = 'PC') THEN
        INSERT INTO public.productvariant (unit, currentstock, minimumstock, "productId") VALUES ('PC', 300, 30, soapId);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.productvariant WHERE "productId" = soapId AND unit = 'LT') THEN
        INSERT INTO public.productvariant (unit, currentstock, minimumstock, "productId") VALUES ('LT', 400, 40, soapId);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.productvariant WHERE "productId" = soapId AND unit = 'LT') THEN
        INSERT INTO public.productvariant (unit, currentstock, minimumstock, "productId") VALUES ('LT', 500, 50, soapId);
    END IF;

    -- Insert into supplier if not exists
    IF NOT EXISTS (SELECT 1 FROM public.supplier WHERE suppliername = 'Supplier 1') THEN
        INSERT INTO public.supplier (suppliername, supplieraddress, supplierphone, supplieremail, suppliercontactperson, suppliercontactpersonphone) VALUES ('Supplier 1', 'Address 1', 'Phone 1', 'Email 1', 'Contact Person 1', 'Contact Person Phone 1');
    END IF;
END $$;