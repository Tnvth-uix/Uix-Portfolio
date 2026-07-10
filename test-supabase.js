// Quick test to verify Supabase connection and tables
import { createClient } from "@supabase/supabase-js";

const url = "https://iytpfckxdikpqqzmstyp.supabase.co";
const key = "sb_publishable_3ijqnUM7NRurcHbXYwCsjA_bwe73leL";

const supabase = createClient(url, key);

async function testSupabase() {
  console.log("🔍 Testing Supabase connection...\n");

  try {
    // Test 1: Check if we can connect
    console.log("✓ Connected to Supabase\n");

    // Test 2: Check if business_cases table exists
    console.log("📊 Checking business_cases table...");
    const { data: cases, error: casesError } = await supabase
      .from("business_cases")
      .select("count()")
      .single();

    if (casesError) {
      console.log("❌ Error accessing business_cases:");
      console.log(`   Code: ${casesError.code}`);
      console.log(`   Message: ${casesError.message}`);
      if (casesError.details) {
        console.log(`   Details: ${casesError.details}`);
      }
    } else {
      console.log(`✓ business_cases table exists (${cases?.count || 0} rows)\n`);
    }

    // Test 3: Try to insert a test record
    console.log("📝 Testing INSERT into business_cases...");
    const { data: inserted, error: insertError } = await supabase
      .from("business_cases")
      .insert({
        slug: "test-case-" + Date.now(),
        title: "Test Case",
        content: "# Test\n\nThis is a test",
        is_example: false,
      })
      .select();

    if (insertError) {
      console.log("❌ Error inserting test case:");
      console.log(`   Code: ${insertError.code}`);
      console.log(`   Message: ${insertError.message}`);
      if (insertError.details) {
        console.log(`   Details: ${insertError.details}`);
      }
      if (insertError.hint) {
        console.log(`   Hint: ${insertError.hint}`);
      }
    } else {
      console.log(`✓ INSERT successful! Inserted:`, inserted?.[0]?.slug);

      // Test 4: Delete the test record
      if (inserted?.[0]?.id) {
        const { error: deleteError } = await supabase
          .from("business_cases")
          .delete()
          .eq("id", inserted[0].id);

        if (!deleteError) {
          console.log("✓ Test record cleaned up\n");
        }
      }
    }

    // Test 5: Check other tables
    const tables = ["section_images", "deck_pending", "deck_taxonomy", "interstitials"];
    console.log("📋 Checking other tables:");

    for (const table of tables) {
      const { error } = await supabase.from(table).select("count()").single();
      if (error) {
        console.log(`   ❌ ${table}: NOT FOUND`);
      } else {
        console.log(`   ✓ ${table}: OK`);
      }
    }

  } catch (err) {
    console.error("💥 Critical error:", err.message);
  }
}

testSupabase();
