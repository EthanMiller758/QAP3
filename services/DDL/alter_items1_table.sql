ALTER TABLE IF EXISTS public."Items"
    ADD COLUMN price NUMERIC(10, 2)
    ADD COLUMN uuid uuid;

-- We need the business to tell us how we update the email addresses in production
-- for now we do it ourselves as the developers. 
UPDATE public."Items" SET price='5.00' WHERE id = 1;
UPDATE public."Items" SET price='10.00' WHERE id = 2;
UPDATE public."Items" SET price='15.00' WHERE id = 3;
UPDATE public."Items" SET price='20.00' WHERE id = 4;

-- Lucky you DBA you need to write a script to update all the UUID in production
UPDATE public."Items" SET uuid='8dead2d0-6325-400b-b729-c3403138f153' WHERE id = 1;
UPDATE public."Items" SET uuid='1c320a13-6564-47b9-b697-1f312e821f9f' WHERE id = 2;
UPDATE public."Items" SET uuid='d7b1240c-c35a-4d6d-a3f3-9593502c9ad6' WHERE id = 3;
UPDATE public."Items" SET uuid='35de96ac-bf64-4fad-b6a0-163a90a2f7df' WHERE id = 4;
	
ALTER TABLE IF EXISTS public."Items"
    ALTER COLUMN email SET NOT NULL
    ALTER COLUMN uuid SET NOT NULL;
	
ALTER TABLE IF EXISTS public."Items"
    ADD CONSTRAINT uq_items_price UNIQUE (price)
    ADD CONSTRAINT uq_items_uuid UNIQUE (uuid);